classes = {
            0: 'dew',
            1: 'fogsmog',
            2: 'frost',
            3: 'glaze',
            4: 'hail',
            5: 'lightning',
            6: 'rain',
            7: 'rainbow',
            8: 'rime',
            9: 'sandstorm',
            10: 'snow'
        };

async function predictWeather() {
    var result = document.getElementById('result');
    result.innerHTML = "Processing image ...";
    const model = await tf.loadLayersModel('./assets/model/model.json');
    //model.summary();
    var pred = model.predict(preprocess()).dataSync();
    var index = pred.indexOf(Math.max(...pred));
    result.innerHTML = classes[index];
}

function preprocess()
{
    var img = document.getElementById('output');
    //convert the image data to a tensor 
    let tensor = tf.browser.fromPixels(img);
    //resize to 256 X 256
    const resized = tf.image.resizeBilinear(tensor, [256, 256]).toFloat();
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0);
    return batched
}