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
    puts "in /ring phone_num is #{phone_num}"
    phone = Phone.new(phone_num)
    phone.ring
    haml :index
end
