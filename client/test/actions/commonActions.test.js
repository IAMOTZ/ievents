import * as actions from '../../actions/commonActions';

describe('Common Actions', () => {
  it('should dispatch STOP_ASYNC_ADDING_USER', () => {
    expect(actions.stopAsyncProcess('ADDING_USER')).toEqual({
      type: 'STOP_ASYNC_ADDING_USER'
    });
  });
});
