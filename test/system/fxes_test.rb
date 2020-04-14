require "application_system_test_case"

class FxesTest < ApplicationSystemTestCase
  setup do
    @fx = fxes(:one)
  end

  test "visiting the index" do
    visit fxes_url
    assert_selector "h1", text: "Fxes"
  end

  test "creating a Fx" do
    visit fxes_url
    click_on "New Fx"

    fill_in "Name", with: @fx.name
    fill_in "Volume", with: @fx.volume
    click_on "Create Fx"

    assert_text "Fx was successfully created"
    click_on "Back"
  end

  test "updating a Fx" do
    visit fxes_url
    click_on "Edit", match: :first

    fill_in "Name", with: @fx.name
    fill_in "Volume", with: @fx.volume
    click_on "Update Fx"

    assert_text "Fx was successfully updated"
    click_on "Back"
  end

  test "destroying a Fx" do
    visit fxes_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Fx was successfully destroyed"
  end
end
