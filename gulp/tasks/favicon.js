import { plugins } from "../../gulp/config/plugins.js"
import realFavicon from 'gulp-real-favicon';
import fs from "fs"
// https://snippets.cacher.io/snippet/0c6723fe42feafa27b89
// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

export const generatFavicon = (done) =>{
    realFavicon.generateFavicon({
        // где лежит исходник
        masterPicture: `${app.path.src.favicon}`,
        // куда сохраняем
        dest: `${app.path.build.html}favicon`,
        iconsPath: 'favicon/',
        design: {
            ios: {
              // pictureAspect: 'noChange', // По умолчанию, без отступов
              // Все дополнительные опции смотрим на https://realfavicongenerator.net/favicon/gulp
              pictureAspect: 'backgroundAndMargin',
              backgroundColor: '#ffffff',
              margin: '10%',
              assets: {
                ios6AndPriorIcons: false,
                ios7AndLaterIcons: false,
                precomposedIcons: false,
                declareOnlyDefaultIcon: true
              } 
            },
            desktopBrowser: {},
            windows: {
              pictureAspect: 'noChange',
              backgroundColor: '#ffffff',
              onConflict: 'override',
              assets: {
                windows80Ie10Tile: false,
                windows10Ie11EdgeTiles: {
                  small: false,
                  medium: true,
                  big: false,
                  rectangle: false
                }
              }
            },
            androidChrome: {
              pictureAspect: 'noChange',
              themeColor: '#ffffff',
              manifest: {
                display: 'standalone',
                orientation: 'notSet',
                onConflict: 'override',
                declared: true
              },
              assets: {
                legacyIcon: false,
                lowResolutionIcons: false
              }
            },
            safariPinnedTab: {
              pictureAspect: 'silhouette',
              themeColor: '#ffffff'
            }
          },
          settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
          },
          markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
      })
}

export async function faviconMarkups(){
    app.gulp.src(`${app.path.build.html}index.html`)
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(plugins.htmlmin({ collapseWhitespace: true }))
        .pipe(app.gulp.dest(`${app.path.build.html}`));
}
