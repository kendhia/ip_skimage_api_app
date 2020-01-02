from __future__ import absolute_import, division, print_function, unicode_literals

# Install TensorFlow

import tensorflow as tf
import tensorflow_datasets as tfds


# You can fetch the DatasetBuilder class by string
cifar_builder = tfds.builder('cifar10')
cifar_builder.download_and_prepare()
# Construct a tf.data.Dataset
datasets = cifar_builder.as_dataset()
train_dataset, test_dataset = datasets['train'], datasets['test']
# Get the `DatasetInfo` object, which contains useful information about the
# dataset and its features
#data = ds.load_data()
#print(data)
#(x_train, y_train), (x_test, y_test) = cifar_data.load_data()

#x_train, x_test = x_train / 255.0, x_test / 255.0
""" 
model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=5)

print(model.evaluate(x_test,  y_test, verbose=2))

 """