#!/usr/local/bin/ruby
require 'webrick'
include WEBrick

dir = Dir::pwd + "/slideshow"
puts "server root: " + dir
port = 12000 + (dir.hash % 1000)

puts "URL: http://#{Socket.gethostname}:#{port}"

s = HTTPServer.new(
  :Port            => port,
  :DocumentRoot    => dir
)

trap("INT"){ s.shutdown }
s.start