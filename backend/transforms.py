from skimage import data, io
import numpy as np
from skimage.transform import rescale, resize, downscale_local_mean, rotate, swirl
from skimage.util import crop
from skimage.exposure import rescale_intensity

def defaultCrop(image):
    new_image = crop(image, ((50, 100), (50, 50)), copy=False)
    return new_image
def defaultRotate(image):
    new_image = rotate(image, 50)
    return new_image



list_of_transforms = {
    "rescale": rescale, 
    "resize": resize, 
    "downscale_local_mean": downscale_local_mean, 
    "rotate": defaultRotate,
    "swirl": swirl,''
    "crop": defaultCrop,
    "rescale_intensity": rescale_intensity
    }

def apply_transform(name_of_transform, *extra,  **extra_arg):
    image = io.imread("1.jpeg", as_gray=True)
    new_image = list_of_transforms[name_of_transform](image, *extra, **extra_arg)
    io.imsave(f"{name_of_transform}.jpeg", new_image)
    return f"{name_of_transform}.jpeg"

# apply_transform("rescale_intensity", image*1.0, in_range="image", out_range="uint8")
# apply_transform("crop", image, ((50, 100), (50, 50)), copy=False)

