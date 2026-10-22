fx_version 'cerulean'
game 'gta5'
lua54 'yes'

dependencies {
    'es_extended',
}

client_scripts {
    'client/*.lua',
}

server_scripts {
    'server/*.lua',
}

shared_scripts {
    '@es_extended/imports.lua',
    'common/*.lua',
}

files {
    'web/dist/**/*',
}

ui_page 'web/dist/index.html'
