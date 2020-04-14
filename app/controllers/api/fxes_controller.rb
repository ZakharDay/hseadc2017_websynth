class Api::FxesController < Api::ApplicationController
  # before_action :set_fx, only: [:show, :edit, :update, :destroy]

  # GET /fxes
  # GET /fxes.json
  def index
    fxes = Fx.all
    fxes_array = []

    fxes.each do |fx|
      fxes_array << fx.as_json_for_rack
    end

    render json: fxes_array
  end

  # GET /fxes/1
  # GET /fxes/1.json
  def show
    fx = Fx.find(params[:id])
    render json: fx.as_json_for_use
  end

  # GET /fxes/new
  def new
    @fx = Fx.new
  end

  # GET /fxes/1/edit
  def edit
  end

  # POST /fxes
  # POST /fxes.json
  def create
    @fx = Fx.new(fx_params)

    respond_to do |format|
      if @fx.save
        format.html { redirect_to @fx, notice: 'Fx was successfully created.' }
        format.json { render :show, status: :created, location: @fx }
      else
        format.html { render :new }
        format.json { render json: @fx.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /fxes/1
  # PATCH/PUT /fxes/1.json
  def update
    respond_to do |format|
      if @fx.update(fx_params)
        format.html { redirect_to @fx, notice: 'Fx was successfully updated.' }
        format.json { render :show, status: :ok, location: @fx }
      else
        format.html { render :edit }
        format.json { render json: @fx.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /fxes/1
  # DELETE /fxes/1.json
  def destroy
    @fx.destroy
    respond_to do |format|
      format.html { redirect_to fxes_url, notice: 'Fx was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # def set_fx
    #   @fx = Fx.find(params[:id])
    # end

    # Only allow a list of trusted parameters through.
    def fx_params
      params.require(:fx).permit(:name, :volume)
    end
end
