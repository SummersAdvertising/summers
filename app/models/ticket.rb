class Ticket < ActiveRecord::Base
  attr_accessible :content, :email, :issue, :name, :phone
end
