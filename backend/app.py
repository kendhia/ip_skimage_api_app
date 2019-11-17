from flask import Flask, send_file, request
app = Flask(__name__)
import filters
import histogram_imp
import transforms

@app.route('/make_filter', methods=['POST'])
def makeFilter():
    imagefile = request.files["file"].read()
    with open("1.jpeg", "wb+") as fp:
        fp.write(imagefile)
    filter_type =  request.args.get('type')
    result_name = filters.apply_filter(filter_type)
    return send_file(result_name, mimetype='image/gif')

@app.route('/histo', methods=['POST'])
def makeHisto():
    imagefile = request.files["file"].read()
    with open("1.jpeg", "wb+") as fp:
        fp.write(imagefile)
    filter_type =  request.args.get('type')
    result_name = histogram_imp.apply_filter(filter_type)
    return send_file(result_name, mimetype='image/gif')

@app.route('/transform', methods=['POST'])
def transform():
    imagefile = request.files["file"].read()
    with open("1.jpeg", "wb+") as fp:
        fp.write(imagefile)
    filter_type =  request.args.get('type')
    result_name = transforms.apply_transform(filter_type)
    return send_file(result_name, mimetype='image/gif')

if __name__ == "__main__":
    app.run()
