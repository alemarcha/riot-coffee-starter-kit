appMixins =
    init: ()->
        @store = appStore 
        @on 'updated',() ->
            # sample global event 
            return
