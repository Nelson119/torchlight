console.clear();

var github = /nelson.works/.test(location.href);

var rootPath = github ? 'http://nelson.works/torchlight/' : 'http://localhost:9000/';

var path = location.href.replace(rootPath, '');

location.href = rootPath + '?path=' + encodeURIComponent(path);
