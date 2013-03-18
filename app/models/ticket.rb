class Ticket < ActiveRecord::Base
  attr_accessible :content, :email, :issue, :name, :phone
  
  
  paginates_per 15
end
