require 'test_helper'

class FxesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @fx = fxes(:one)
  end

  test "should get index" do
    get fxes_url
    assert_response :success
  end

  test "should get new" do
    get new_fx_url
    assert_response :success
  end

  test "should create fx" do
    assert_difference('Fx.count') do
      post fxes_url, params: { fx: { name: @fx.name, volume: @fx.volume } }
    end

    assert_redirected_to fx_url(Fx.last)
  end

  test "should show fx" do
    get fx_url(@fx)
    assert_response :success
  end

  test "should get edit" do
    get edit_fx_url(@fx)
    assert_response :success
  end

  test "should update fx" do
    patch fx_url(@fx), params: { fx: { name: @fx.name, volume: @fx.volume } }
    assert_redirected_to fx_url(@fx)
  end

  test "should destroy fx" do
    assert_difference('Fx.count', -1) do
      delete fx_url(@fx)
    end

    assert_redirected_to fxes_url
  end
end
