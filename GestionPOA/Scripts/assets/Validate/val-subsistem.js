$(document).ready(function () {
    $('#valid').click(function () {
        $('.ui form')
            .form({
                on: 'blur',
                fields: {
                    VMsubsistema: {
                        identifier: 'VMsubsistema',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'El campo subsistema no puede estar vacío'
                            }
                        ]
                    }
                }
            });
    })
});