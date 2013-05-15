class ArticlesController < ApplicationController
  
  def index
    @articles = Article.where("status = ?", "show").order("created_at DESC").all

    if(@articles)
      @articles.each do | article |
        if(!article.content.blank?)
          @paragraphs = JSON.parse(article.content)
          @paragraphs.each do | p |
            next if p["type"] != "img"

            article[:imgpath] = p["path"]
            break
          end
        end
      end
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @articles }
    end
  end

  def show
    @article = Article.where("(id = ? or namehash = ?) and status = ?", params[:id], params[:id], "show").first

    if(@article)
      #find prev and next article
      @prev = Article.where("id > ? and status = ?", @article.id, "show").first
      @next = Article.where("id < ? and status = ?", @article.id, "show").last

      # generate contents for meta tags
      $meta_description = '';
      if(!@article.content.blank?)
        @paragraphs = JSON.parse(@article.content)
        max_length = 100

        @paragraphs.each do | p |
          next if p["type"] != "p"

          partical_content = p["content"].gsub(/\\n/, "")
          $meta_description += partical_content
          max_length -= partical_content.length

          break if max_length <= 0
        end
      end

      $meta_title = @article.title
      $meta_kw = @article.metakw

      # article click count
      @article.count += 1
      @article.save
    end

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @article }
    end
  end
end
