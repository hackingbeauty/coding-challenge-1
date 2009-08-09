# experimental.rb
require 'rubygems'
require 'sinatra'
get '/' do
        'Tickle me now!'
end
get '/hello/:name' do
        "Hello #{params[:name]}!"
end
