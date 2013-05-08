Summers::Application.routes.draw do
  resources :articles, :only => [:index, :show]

  resources :tickets

  match "/admin/createAdmin" => "admin#createAdmin", :via => :post
  match "/admin/loginCheck" => "admin#loginCheck", :via => :post
  match "/admin/update" => "admin#update", :via => :put

  match "/contact.html" => 'tickets#new'

  namespace :admin do
    get "log_in", "log_out", "edit"
    get '/' => 'tickets#index'
    
    resources :tickets
    resources :articles, :except => :new do
      match 'uploadPhoto' => 'article#createPhoto', :via => [:post]
      match 'deletePhoto/:id' => 'article#destroyPhoto', :via => [:delete]
    end
  end

end
