# encoding: utf-8
class TicketMailer < ActionMailer::Base
  default from: "\"夏天客服系統\" <adword@summers.com.tw>"
  
  def send_notice(ticket)
  	@ticket = ticket
  	
  	mail(:to => ["andy@summers.com.tw", "yuzhe@summers.com.tw", "awhere@summers.com.tw"],
  	     :subject => "[夏天廣告官網] 收到使用者詢問囉！")
  	
  end
end
