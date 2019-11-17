from skimage import data, io
import numpy as np
from skimage import exposure
from skimage import data, img_as_float
import matplotlib.pyplot as plt

# img = img_as_float(io.imread("1.jpeg", as_gray=True))

def show_histo(img, bins=256):
    plt.hist(img.ravel(), bins = bins)
    plt.savefig("histo.jpeg")
    return "histo.jpeg"

def equalize_img(img):
    new_image = exposure.equalize_hist(img)
    io.imsave("equalize.jpeg", new_image)
    return "equalize.jpeg"

list_of_histo = {
    "show": show_histo, 
    "equalize": equalize_img
    }

def apply_filter(name_of_action, *args, **extra_arg):
    image = io.imread("1.jpeg", as_gray=True)
    new_image = list_of_histo[name_of_action](image, *args, **extra_arg)
    return new_image

