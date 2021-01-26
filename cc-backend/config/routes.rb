Rails.application.routes.draw do
  get "/clothings", to: "clothings#index"
  get "/users", to: "users#index"
  get "/users/:id", to: "users#show"
  get "/outfits", to: "outfits#index"
end
