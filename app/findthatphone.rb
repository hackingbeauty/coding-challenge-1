# experimental.rb
require 'rubygems'
require 'sinatra'
require 'haml'
require 'phone'

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

get '/ring' do
    phone_num = params['phone_number']
    phone = Phone.new
    phone.ring phone_num
    haml :index
end
