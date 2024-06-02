package com.example.tlsstock.services.QRCode;

import org.springframework.stereotype.Service;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

@Service
public class QRCodeGeneratorService{

    public byte[] generateQRCodeImage(String text, int width, int height) throws WriterException, IOException {
        BitMatrix bitMatrix = generateBitMatrix(text, width, height);
        return matrixToByteArray(bitMatrix);
    }

    private BitMatrix generateBitMatrix(String text, int width, int height) throws WriterException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        return qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);
    }

    private byte[] matrixToByteArray(BitMatrix bitMatrix) throws IOException {
        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
        return pngOutputStream.toByteArray();
    }

}
