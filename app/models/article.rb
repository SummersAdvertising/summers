class Article < ActiveRecord::Base
  attr_accessible :content, :count, :metakw, :namehash, :title
  has_many :articlephotos, :dependent => :destroy

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
