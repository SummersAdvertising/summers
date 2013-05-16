#encoding: utf-8
class Article < ActiveRecord::Base
  attr_accessible :content, :count, :metakw, :namehash, :title, :status
  has_many :articlephotos, :dependent => :destroy
  validates :namehash, :uniqueness => { :message => "網址重複，請重新輸入。" }, :allow_nil => true, :allow_blank => true
  validates :namehash, :format => { :with => /^[^(.\s)]?[^(.\s)]*[^(.\s)]?$/, :message => "網址不能包含空白字元或.(dot)，請重新輸入。" }, :if => :not_blank?

  validates :title, :content, :metakw, :presence =>{:message => "不能為空"}, :if => :is_article?

  def not_blank?
    (namehash && namehash.length >0)
  end
  def is_article?
    status == "article"
  end

  paginates_per 15
  
  #delete the blank folder built by carrierwave
  before_destroy :remember_id
  after_destroy :remove_id_directory

  

  protected
  def remember_id
    @id = id
  end

  def remove_id_directory
    FileUtils.remove_dir("#{Rails.root}/public/uploads/Articlephoto/#{@id}", :force => true)
  end
end
