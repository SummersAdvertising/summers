class Articlephoto < ActiveRecord::Base
  attr_accessible :article_id, :img, :name
  belongs_to :article

  mount_uploader :image, ImageUploader

  before_create :update_filename
  
  private
  def update_filename
  	self.name = image.file.filename
  end
end
