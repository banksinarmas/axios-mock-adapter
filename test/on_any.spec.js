var axios = require('axios');
var expect = require('chai').expect;

var MockAdapter = require('../src');

describe('MockAdapter onAny', function() {
  var instance;
  var mock;

  beforeEach(function() {
    instance = axios.create();
    mock = new MockAdapter(instance);
  });

  it('registers a handler for every HTTP method', function() {
    mock.onAny('/foo').reply(200);

    expect(mock.handlers['get']).not.to.be.empty;
    expect(mock.handlers['patch']).not.to.be.empty;
    expect(mock.handlers['put']).not.to.be.empty;
  });

  it('mocks any request with a matching url', function(done) {
    mock.onAny('/foo').reply(200);

    instance.head('/foo')
      .then(function() {
        return instance.patch('/foo');
      })
      .then(function() {
        done();
      });
  });

  it('removes all handlers after replying with replyOnce', function(done) {
    mock.onAny('/foo').replyOnce(200);

    instance.get('/foo')
      .then(function() {
        expect(mock.handlers['get']).to.be.empty;
        expect(mock.handlers['post']).to.be.empty;
        done();
      });
  });
});
