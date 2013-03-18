# encoding: utf-8
class TicketMailer < ActionMailer::Base
  default from: "adword@summers.com.tw"
  
  def send_notice(ticket)
  	@ticket = ticket

  	mail(:to => ["yuzhe@summers.com.tw"],
  	     :subject => "[夏天廣告官網] 收到使用者詢問囉！：#{@ticket.name}")
  	
  end
end
