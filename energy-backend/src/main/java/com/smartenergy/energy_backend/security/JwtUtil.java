package com.smartenergy.energy_backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    // 🔐 Secret key (must be at least 32 characters)
    private static final String SECRET_KEY =
            "mysecretkeymysecretkeymysecretkeymysecretkey";

    // ⏱ Token validity (1 day)
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // ✅ Generate token with EMAIL as subject
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email) // 👈 EMAIL
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ Extract email from token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // ✅ Validate token
    public boolean validateToken(String token, UserDetails userDetails) {
        String email = extractUsername(token);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // ✅ Check expiration
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // ===================== INTERNAL HELPERS =====================

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> resolver) {
        final Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    // 🔥 THIS WAS MISSING (ROOT CAUSE)
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
