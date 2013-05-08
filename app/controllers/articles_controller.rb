class ArticlesController < ApplicationController
  
  def index
    @articles = Article.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @articles }
    end
  end

  def show
    @article = Article.where("id = ? or namehash = ?", params[:id], params[:id]).first

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @article }
    end
  end
end
