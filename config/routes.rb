Summers::Application.routes.draw do


  resources :tickets

  match "/admin/createAdmin" => "admin#createAdmin", :via => :post
  match "/admin/loginCheck" => "admin#loginCheck", :via => :post
  match "/admin/update" => "admin#update", :via => :put

  namespace :admin do
    get "sign_up", "log_in", "log_out", "edit"
    get '/' => 'news#index'
    
    resources :tickets
    
    resources :news, :except => :new do
      match 'uploadPhoto' => 'news#createPhoto', :via => [:post]
      match 'deletePhoto/:id' => 'news#destroyPhoto', :via => [:delete]
    end
  end

end
