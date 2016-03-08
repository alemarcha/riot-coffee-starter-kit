<hello-world>
    <div onclick={doHelloWorld}>
        Hello World!
    </div>
    <script type="coffee">
        @doHelloWorld = () =>
            alert "Hello World!"
            return
    </script>

</hello-world>