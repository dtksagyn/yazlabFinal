const calculateScores = (application, announcement) => {
  const scores = {
    total: 0,
    details: {},
    meetsRequirements: true,
    rejectionReasons: [],
  };

  // 1. Calculate section scores with rounding rules
  for (const [section, value] of Object.entries(application.data)) {
    let sectionScore = 0;

    // Special case for Section A özel durum
    if (section === "A" && value.ozelDurum) {
      sectionScore += calculateOzelDurum(value.ozelDurum);
    }

    // Normal scoring
    sectionScore += calculateSectionScore(section, value, announcement);

    // Apply rounding rules
    const decimal = sectionScore % 1;
    if (decimal < 0.5) sectionScore = Math.floor(sectionScore);
    else sectionScore = Math.ceil(sectionScore);

    // Minimum score of 1
    if (sectionScore > 0 && sectionScore < 1) sectionScore = 1;

    scores.details[section] = sectionScore;
    scores.total += sectionScore;
  }

  // 2. Check against announcement requirements
  for (const [section, req] of announcement.requirements) {
    const score = scores.details[section] || 0;

    if (req.asgari && score < req.asgari) {
      scores.meetsRequirements = false;
      scores.rejectionReasons.push(
        `${section} score (${score}) below minimum (${req.asgari})`
      );
    }

    if (req.azami && score > req.azami) {
      scores.meetsRequirements = false;
      scores.rejectionReasons.push(
        `${section} score (${score}) exceeds maximum (${req.azami})`
      );
    }
  }

  return scores;
};

const calculateSectionScore = (section, data, announcement) => {
  // Implement specific scoring rules for each section
  switch (section) {
    case "A":
      return (
        data.publications *
        (announcement.requirements.get("A").kCoefficient
          ? 1 / data.coAuthors
          : 1)
      );
    case "D":
      return data.projects * 10;
    case "H":
      return data.activities * 5;
    default:
      return data.value || 0;
  }
};

const calculateOzelDurum = (ozelDurum) => {
  // Special scoring for Section A özel durum
  const weights = {
    durum1: 0.5,
    durum2: 0.7,
    durum3: 1.0,
    durum4: 1.2,
    durum5: 1.5,
    durum6: 2.0,
  };
  return weights[ozelDurum] || 0;
};

module.exports = { calculateScores };
