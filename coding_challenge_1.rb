require 'rubygems'
require 'sinatra'
require 'haml'
require 'yaml'
require 'open-uri'
require 'openssl'
require 'json'

OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE #SSL open-uri hack. open-uri can't read ssl links

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

get '/get_restaurants' do
  url = settings.san_francisco_http_call + '&key=' + settings.google_places_api_key
  puts url
  jsonResponse = open(url).read.to_s
end

get '/autocomplete_search' do
  input = URI.escape params[:searchInput]
  puts "input is #{input}"
  url = settings.google_places_autocomplete_url + 'input=' + input +'&types=food&sensor=false&key=' + settings.google_places_api_key
  jsonResponse = open(url).read.to_s
  puts url
  return jsonResponse
end


