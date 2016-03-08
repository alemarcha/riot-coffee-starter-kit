appStore = new AppStore
RiotControl.addStore appStore 
# Add mixins to all tags 
riot.mixin appMixins 
# mount all elements 
riot.mount '*', {} 

# jquery stuff
###
(($) ->
    # $( 'element' ).action() 
) jQuery
### 