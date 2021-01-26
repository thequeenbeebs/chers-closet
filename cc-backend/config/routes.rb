Rails.application.routes.draw do
  get "/clothings", to: "clothings#index"
  post "/clothings", to: "clothings#create"
  delete "/clothings/:id", to: "clothings#delete"
  patch "/clothings/:id", to: "clothings#update"
  # get "/users", to: "users#index"
  get "/users/:username", to: "users#show"
  get "/outfits", to: "outfits#index"
end
