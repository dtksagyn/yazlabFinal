import React, { useState } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";

const Step3Publications = ({
  nextStep,
  prevStep,
  updateFormData,
  formData,
}) => {
  const [journalArticles, setJournalArticles] = useState([]);
  const [books, setBooks] = useState([]);
  const [proceedings, setProceedings] = useState([]);

  // Handle input change for Journal Articles
  const handleJournalChange = (index, event) => {
    const newJournalArticles = [...journalArticles];
    newJournalArticles[index][event.target.name] = event.target.value;
    setJournalArticles(newJournalArticles);
  };

  // Handle input change for Books
  const handleBookChange = (index, event) => {
    const newBooks = [...books];
    newBooks[index][event.target.name] = event.target.value;
    setBooks(newBooks);
  };

  // Handle input change for Conference Proceedings
  const handleProceedingChange = (index, event) => {
    const newProceedings = [...proceedings];
    newProceedings[index][event.target.name] = event.target.value;
    setProceedings(newProceedings);
  };

  // Add new journal article
  const addJournalArticle = () => {
    setJournalArticles([...journalArticles, {}]);
  };

  // Add new book
  const addBook = () => {
    setBooks([...books, {}]);
  };

  // Add new conference proceeding
  const addProceeding = () => {
    setProceedings([...proceedings, {}]);
  };

  return (
    <div>
      <h3>Step 3: Publications</h3>

      {/* Journal Articles Section */}
      <Card className="mb-3">
        <Card.Body>
          <h5>Journal Articles</h5>
          {journalArticles.map((article, index) => (
            <div key={index} className="mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Article Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="articleTitle"
                      value={article.articleTitle || ""}
                      onChange={(e) => handleJournalChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Authors</Form.Label>
                    <Form.Control
                      type="text"
                      name="authors"
                      value={article.authors || ""}
                      onChange={(e) => handleJournalChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Journal Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="journalName"
                      value={article.journalName || ""}
                      onChange={(e) => handleJournalChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Indexing</Form.Label>
                    <Form.Control
                      as="select"
                      name="indexing"
                      value={article.indexing || ""}
                      onChange={(e) => handleJournalChange(index, e)}
                    >
                      <option value="SCI-E">SCI-E</option>
                      <option value="SSCI">SSCI</option>
                      <option value="AHCI">AHCI</option>
                      <option value="ESCI">ESCI</option>
                      <option value="Scopus">Scopus</option>
                      <option value="TR Dizin">TR Dizin</option>
                      {/* Add other indexing options as needed */}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  {article.indexing && (
                    <Form.Group>
                      <Form.Label>Quartile</Form.Label>
                      <Form.Control
                        as="select"
                        name="quartile"
                        value={article.quartile || ""}
                        onChange={(e) => handleJournalChange(index, e)}
                      >
                        <option value="Q1">Q1</option>
                        <option value="Q2">Q2</option>
                        <option value="Q3">Q3</option>
                        <option value="Q4">Q4</option>
                      </Form.Control>
                    </Form.Group>
                  )}
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="date"
                      name="year"
                      value={article.year || ""}
                      onChange={(e) => handleJournalChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Volume/Issue</Form.Label>
                    <Form.Control
                      type="text"
                      name="volumeIssue"
                      value={article.volumeIssue || ""}
                      onChange={(e) => handleJournalChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Pages</Form.Label>
                    <Form.Control
                      type="text"
                      name="pages"
                      value={article.pages || ""}
                      onChange={(e) => handleJournalChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>DOI</Form.Label>
                    <Form.Control
                      type="text"
                      name="doi"
                      value={article.doi || ""}
                      onChange={(e) => handleJournalChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Is Corresponding Author?</Form.Label>
                    <Form.Check
                      type="checkbox"
                      name="isCorrespondingAuthor"
                      checked={article.isCorrespondingAuthor || false}
                      onChange={(e) => handleJournalChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Is First Author?</Form.Label>
                    <Form.Check
                      type="checkbox"
                      name="isFirstAuthor"
                      checked={article.isFirstAuthor || false}
                      onChange={(e) => handleJournalChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Upload Full Text</Form.Label>
                    <Form.Control
                      type="file"
                      name="fullText"
                      onChange={(e) => handleJournalChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          ))}
          <Button variant="secondary" onClick={addJournalArticle}>
            Add Article
          </Button>
        </Card.Body>
      </Card>

      {/* Books and Book Chapters Section */}
      <Card className="mb-3">
        <Card.Body>
          <h5>Books and Book Chapters</h5>
          {books.map((book, index) => (
            <div key={index} className="mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Book Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="bookTitle"
                      value={book.bookTitle || ""}
                      onChange={(e) => handleBookChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Check
                      type="radio"
                      label="Book"
                      name="type"
                      value="Book"
                      checked={book.type === "Book"}
                      onChange={(e) => handleBookChange(index, e)}
                    />
                    <Form.Check
                      type="radio"
                      label="Book Chapter"
                      name="type"
                      value="Book Chapter"
                      checked={book.type === "Book Chapter"}
                      onChange={(e) => handleBookChange(index, e)}
                    />
                    <Form.Check
                      type="radio"
                      label="Edited Book"
                      name="type"
                      value="Edited Book"
                      checked={book.type === "Edited Book"}
                      onChange={(e) => handleBookChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control
                      type="text"
                      name="publisher"
                      value={book.publisher || ""}
                      onChange={(e) => handleBookChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                      type="text"
                      name="isbn"
                      value={book.isbn || ""}
                      onChange={(e) => handleBookChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="date"
                      name="year"
                      value={book.year || ""}
                      onChange={(e) => handleBookChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Language</Form.Label>
                    <Form.Control
                      as="select"
                      name="language"
                      value={book.language || ""}
                      onChange={(e) => handleBookChange(index, e)}
                    >
                      <option value="English">English</option>
                      <option value="French">French</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Upload Cover Page</Form.Label>
                    <Form.Control
                      type="file"
                      name="coverPage"
                      onChange={(e) => handleBookChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {book.type === "Book Chapter" && (
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Chapter Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="chapterTitle"
                        value={book.chapterTitle || ""}
                        onChange={(e) => handleBookChange(index, e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Page Numbers</Form.Label>
                      <Form.Control
                        type="text"
                        name="pageNumbers"
                        value={book.pageNumbers || ""}
                        onChange={(e) => handleBookChange(index, e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              )}
            </div>
          ))}
          <Button variant="secondary" onClick={addBook}>
            Add Book
          </Button>
        </Card.Body>
      </Card>

      {/* Conference Proceedings Section */}
      <Card className="mb-3">
        <Card.Body>
          <h5>Conference Proceedings</h5>
          {proceedings.map((proceeding, index) => (
            <div key={index} className="mb-3">
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Proceeding Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="proceedingTitle"
                      value={proceeding.proceedingTitle || ""}
                      onChange={(e) => handleProceedingChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Conference Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="conferenceName"
                      value={proceeding.conferenceName || ""}
                      onChange={(e) => handleProceedingChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="type"
                      value={proceeding.type || ""}
                      onChange={(e) => handleProceedingChange(index, e)}
                    >
                      <option value="Oral">Oral</option>
                      <option value="Poster">Poster</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={proceeding.date || ""}
                      onChange={(e) => handleProceedingChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={proceeding.location || ""}
                      onChange={(e) => handleProceedingChange(index, e)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Upload Certificate of Participation</Form.Label>
                    <Form.Control
                      type="file"
                      name="certificate"
                      onChange={(e) => handleProceedingChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Upload Full Text</Form.Label>
                    <Form.Control
                      type="file"
                      name="fullText"
                      onChange={(e) => handleProceedingChange(index, e)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          ))}
          <Button variant="secondary" onClick={addProceeding}>
            Add Proceeding
          </Button>
        </Card.Body>
      </Card>

      {/* Buttons for navigating steps */}
      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={prevStep}>
          Previous
        </Button>
        <Button variant="primary" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step3Publications;
