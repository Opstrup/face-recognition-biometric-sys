import urllib2
import urllib
import os
import numpy as np
import cv2

# pull traning data from web
def store_raw_images():

    # webcame images from laptop
    images_link = 'https://u2608706.dl.dropboxusercontent.com/u/2608706/training_images_links'
    #images_link = 'https://u2608706.dl.dropboxusercontent.com/u/2608706/test_images_links'

    req = urllib2.Request(images_link)
    image_urls = urllib2.urlopen(req).read()

    # training images
    if not os.path.exists('training-imgs'):
        os.makedirs('training-imgs')

    # test images
    #if not os.path.exists('test-imgs'):
    #    os.makedirs('test-imgs')

    img_num = 1

    print('length of links file: ', len(image_urls.split('\n')))

    for i in image_urls.split('\n'):
        try:
            img_name = i.split('/')[-1]
            print(i)
            print(img_name)

            # webcame images from laptop - training images
            urllib.urlretrieve(i, 'training-imgs/' + img_name)

            # webcame images from laptop - test images
            #urllib.urlretrieve(i, 'test-imgs/' + img_name)

            img_num += 1

        except Exception as e:
            print(str(e))

def clean_up_corrupted():
    for file_type in ['training-imgs']:
        for img in os.listdir(file_type):
            for corrupted in os.listdir('corrupted'):
                try:
                    current_image_path = str(file_type)+'/'+str(img)
                    corrupted = cv2.imread('corrupted/'+str(corrupted))
                    test_img = cv2.imread(current_image_path)

                    if corrupted.shape == test_img.shape and not(np.bitwise_xor(corrupted, test_img).any()):
                        print('deleting corrupted img')
                        print(current_image_path)
                        os.remove(current_image_path)

                except Exception as e:
                    print(str(e))

# run the script
store_raw_images()
clean_up_corrupted()
