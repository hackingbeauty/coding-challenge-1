require '../lib/twiliorest'

class Phone
    
    # your Twilio authentication credentials
    ACCOUNT_SID = 'ACab108583d03f2fef9736c9159ab3d3f8'
    ACCOUNT_TOKEN = '840bf092245392c7fc8af055592b3801'

    # version of the Twilio REST API to use
    API_VERSION = '2008-08-01'

    # base URL of this application
    BASE_URL = "http://findthatphone.com:4567/"

    # Outgoing Caller ID you have previously validated with Twilio
    CALLER_ID = '(866) 583-6913'
    
    # attr_accessor :phone_num
    # 
    # def initialize phone_num
    #     @phone_num = phone_num.to_s
    #     # puts 'phone number is ' + @phone_num
    # end
    
    def ring phone_num
        puts 'you have executed the ring method'
        # return unless phone_num
        # if !params['number']
        #     redirect_to({ :action => '.', 'msg' => 'Invalid phone number' })
        #     return
        # end

        # parameters sent to Twilio REST API
        d = {
            'Caller' => CALLER_ID,
            'Called' => phone_num,
            'Url' => BASE_URL + '/reminder',
        }
        begin
            puts 'you are in the begin clause'
            puts 'inside begin and you are calling #{phone_num} '
            account = TwilioRest::Account.new(ACCOUNT_SID, ACCOUNT_TOKEN)
            resp = account.request(
                "/#{API_VERSION}/Accounts/#{ACCOUNT_SID}/Calls",
                'GET', d)
            resp.error! unless resp.kind_of? Net::HTTPSuccess
            puts 'this is looking good!'
        rescue StandardError => bang
            puts 'there is a standard error! which is ' + bang
            # redirect_to({ :action => 'views/error.haml', 'msg' => "Error #{ bang }" })
            return
        end
        puts 'you have ended'
        # redirect_to({ :action => 'index.haml', 
        #     'msg' => "Calling #{ @phone_num }..." })
    end
        
end