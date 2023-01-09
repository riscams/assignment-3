const request = require('supertest');
const app = require('../app');
const PhotoController = require('../controllers/photoController');

const mockRequest = (sessionData, body, params, query) => ({
  body,
  params,
  query,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('User Test', () => {

  it('Should fetch all photos success', async () => { 
    const res = await request(app).get('/photos');
    expect(res.statusCode).toEqual(200);
  });

  it('Should fetch all photos failed', async () => { 
    const res = await request(app).get('/photos');
    expect(res.statusCode).toEqual(500);
  });

  it('Should fetch a photo success', async () => {
    const req = {
      params: 1,
    };
    const res = mockResponse();
    await PhotoController.getOnePhotoByID(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('Should fetch a photo failed', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await PhotoController.getOnePhotoByID(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('Should be created photo successfully', async () => {
    const req = mockRequest({}, {
      title: 'Photo Assignment 3',
      caption: 'This is a photo',
      image_url: 'www.google.com',
      UserId: 1,
    });
    const res = mockResponse();
    console.log("whattttt", req)
    await PhotoController.createPhoto(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
