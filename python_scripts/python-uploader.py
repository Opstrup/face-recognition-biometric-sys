#!/usr/bin/env python
# -*- coding: utf-8 -*-
import dropbox

class TransferData:
    def __init__(self, access_token):
        self.access_token = access_token

    def upload_file(self, file_from, file_to):
        """upload a file to Dropbox using API v2
        """
        dbx = dropbox.Dropbox(self.access_token)

        with open(file_from, 'rb') as f:
            dbx.files_upload(f.read(), file_to)

def main():
    access_token = 'access_token'
    transferData = TransferData(access_token)

    file_from = '/notebooks/face-recognition-biometric-sys/log/facerec-bio-6conv-testNN4.model/events.out.tfevents.1498237740.984f69769ba6'
    file_to = '/02238-Biometric-Systems/files-from-docker-env/facerec-bio-6conv-testNN4.model/events.out.tfevents.1498237740.984f69769ba6'

    # API v2
    transferData.upload_file(file_from, file_to)

main()
