# experimental.rb
require 'rubygems'
require 'sinatra'
require 'haml'

get '/' do
  haml :index
end

get '/hello/:name' do
  "Hello #{params[:name]}!"
end

get '/about' do
  "I'm running on Version " + Sinatra::VERSION
end

get '/ui/stylesheets/styles.css' do
  header 'Content-Type' => 'text/css; charset=utf-8'
  # sass :style
end

