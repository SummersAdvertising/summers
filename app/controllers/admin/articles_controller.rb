class Admin::ArticlesController < ApplicationController
  before_filter :require_is_admin
  layout 'admin'

  def index
    @articles = Article.order("created_at DESC").page(params[:page])

    respond_to do |format|
      format.html
      format.json { render json: @articles }
    end
  end

  def show
    @article = Article.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @article }
    end
  end

  def edit
    @article = Article.find(params[:id])
    @photo = Articlephoto.new
  end

  def create
    @article = Article.new

    respond_to do |format|
      if @article.save
        format.html { redirect_to edit_admin_article_path(@article), notice: 'Article was successfully created.' }
        format.json { render json: @article, status: :created, location: @article }
      else
        format.html { redirect_to admin_articles_path }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @article = Article.find(params[:id])
    
    if(params[:article_show])
      @article.status = "show"
    else
      @article.status = ""
    end

    respond_to do |format|
      if @article.update_attributes(params[:article])
        format.html { redirect_to admin_article_path(@article), notice: 'Article was successfully updated.' }
        format.json { head :no_content }
      else
        @photo = Articlephoto.new
        format.html { render action: "edit" }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    respond_to do |format|
      format.html { redirect_to admin_articles_path }
      format.json { head :no_content }
    end
  end

  def createPhoto
    @photo = Article.find(params[:article_id]).articlephotos.new(params[:articlephoto])

    respond_to do |format|
      if @photo.save
        format.json { render json: @photo, status: :created, location: @photo }
        format.js
      else
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroyPhoto
    @photo = Articlephoto.find(params[:id])
    @photopath = "public/uploads/Articlephoto/"+ @photo.article_id.to_s + "/" + @photo.id.to_s + "-" + @photo.name
    
    if(File.exist?(@photopath))
      File.delete(@photopath)
    end

    @photo.destroy

    respond_to do |format|
      format.html { redirect_to :controller => 'photos', :action => 'index' }
    end
  end
end
