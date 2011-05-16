require 'rubygems'
require 'sinatra'
require 'haml'
require 'yaml'

### Configuration
configure do   
  config = YAML::load(File.read('config.yml'))
  config.each_pair do |key, value|
    set(key.to_sym, value)
  end
end

get '/' do
  
  haml :index
end


