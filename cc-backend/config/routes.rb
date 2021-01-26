Rails.application.routes.draw do
  get "/clothings", to: "clothings#index"
  post "/clothings", to: "clothings#create"
  # get "/users", to: "users#index"
  get "/users/:username", to: "users#show"
  get "/outfits", to: "outfits#index"
end
