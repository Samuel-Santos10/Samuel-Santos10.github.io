<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>SISTEMA ACADEMICO</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
        <style>
            
        </style>

        <link rel="stylesheet" href="https://unpkg.com/vue-select@latest/dist/vue-select.css">
        
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>

        <script src="https://unpkg.com/vue-select@latest"></script>
        
    </head>
    <body>

    <div id="app" class="container">
    <registro_alumnos-component></registro_alumnos-component>
    <materias-component></materias-component>
    <matricula-component></matricula-component>
    <inscripcion-component></inscripcion-component>

    </div>
    
    <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
