//http://visionmedia.github.io/superagent/
import request from 'superagent'

const LOCAL_SERVER = '';


const DEV_SERVER = '';
const PRO_SERVER = '';

function getUrl(path) {
    if (path.startsWith('http')) {
        return path;
    }
    return `${LOCAL_SERVER}${path}`;
}

const HttpClient = {
    get: (path, query) => new Promise((resolve, reject) => {
        // alert(234567)
        var req = request
            .get(path)
            .query(query)
            .end((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(res)
                    resolve(JSON.parse(res.text));
                }
            });
    }),

    post: (path, formdata, query) => new Promise((resolve, reject) => {
        request
            .post(getUrl(path))
            .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
            .query(query)
            .send(formdata)
            .end((err, res) => {

                if (err) {
                    reject(err);
                } else {

                    resolve(res.text);
                }
            });
    })
};

export default HttpClient;
