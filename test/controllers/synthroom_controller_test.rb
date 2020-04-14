require 'test_helper'

class SynthroomControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get synthroom_index_url
    assert_response :success
  end

end
