Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, "H2RBxlo0uzdtVwSOMeMuSA", "WICl3C7szS6MwBAPC3n6qrHDjx2jq84Rn4S0gQGMUiY"
  provider :facebook, "141810182630126", "e5e5e15a811048258d8f35fdc8072705", scope: "email, publish_stream"
end
