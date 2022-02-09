package com.sweet.home.member.service;

import com.sweet.home.member.domain.Member;
import java.util.Random;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender javaMailSender;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendMailChangePassword(Member member, String password) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(member.getEmail());
        simpleMailMessage.setSubject("[SweetHome] " + member.getUsername() + " 님의 임시 비밀번호 입니다.");
        simpleMailMessage.setText("안녕하세요, SweetHome 입니다.\n"
            + member.getUsername() + " 님의 SweetHome 임시 비밀번호 안내 이메일 입니다.\n\n"
            + member.getUsername() + " 님의 임시 비밀번호는\n"
            + password + " 입니다.\n\n 감사합니다.");
        javaMailSender.send(simpleMailMessage);
    }

    public String randomPassword() {
        StringBuilder temp = new StringBuilder();

        Random rnd = new Random();
        for (int i = 0; i < 16; i++) {
            int rIndex = rnd.nextInt(3);
            switch (rIndex) {
                case 0:
                    temp.append((char) (rnd.nextInt(26) + 97));
                    break;
                case 1:
                    temp.append((char) (rnd.nextInt(26) + 65));
                    break;
                case 2:
                    temp.append(rnd.nextInt(10));
                    break;
            }
        }

        return temp.toString();
    }
}
