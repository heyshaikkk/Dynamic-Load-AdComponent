const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  it('should retrieve active collections', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('should return images from active collections', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('The Content');
  });

});

describe('Loading of all Collections Successfully', () => {
    it('should respond with status 500', async () => {
      const res = await request(app).get('/birds');
      expect(res.statusCode).toEqual(500);
    });
});

describe('GET /', () => {
    it('should render the main page with correct styles and content', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('<style>');
      expect(res.text).toContain('background-color: black;');
      expect(res.text).toContain('<h1 style="text-align: center;">The Content</h1>');
      expect(res.text).toContain('Introduction:');
      expect(res.text).toContain('Parameters of the Single Column of a CSV in Spark');
    });

});
