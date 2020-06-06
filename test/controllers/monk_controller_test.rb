require 'test_helper'

class MonkControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get monk_index_url
    assert_response :success
  end

end
